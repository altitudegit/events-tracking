import db from './../../config/database';
import { map } from 'lodash';
import moment from 'moment';

const getLogs = (req, res, next) => {
    return db.raw('select * from events').then(function(rows) {
        const result = {
          data: {
            items: rows[0]
          }
        }
        res.status(200).json(result);
  
    }).catch(function(err) {
        next(err);
    });
}

const postEvent = (req, res, next) => {
    const params = req.body.data;
    const now = moment().valueOf();

    db.insert({
      event_key: params.key,
      metadata: JSON.stringify(params.metadata),
      created_at: now,
      updated_at: now
    })
    .returning('log_id')
    .into('events')  
    .then(function() {
      res.status(200).json('success');
    }).catch(function(err) {
        next(err);
    });
}

const deleteEvents = (req, res, next) => {
    return db.raw('delete from events')
    .then(function() {
        res.status(200).json('success');
    }).catch(function(err) {
        next(err);
    });
}

const deleteEvent = (req, res, next) => {
    const key = req.params.key;
    return db('events').where('event_key', key).del()
    .then(function() {
        res.status(200).json('success');
    }).catch(function(err) {
        next(err);
    });
}

const getEventKeys = (req, res, next) => {
    return db.raw("select distinct event_key from events").then(function(rows) {
        const result = {
            data: {
                items: map(rows[0], 'event_key')
            }
        }
        res.status(200).json(result);
    }).catch(function(err) {
        next(err);
    });
}

const filterEvents = (req, res, next) => {
    const params = req.body.data;
    const from = params.from ? moment(params.from).valueOf() : null;
    const to = params.to ? moment(params.to).valueOf() : null;

    return db.raw(`SELECT from_unixtime(created_at/1000, "%m-%d") as day, COUNT(*) as event_count
        FROM eventTracker.events 
        WHERE (? IS NULL OR event_key = ?) 
            AND (? IS NULL OR created_at >= ?) 
            AND (? IS NULL OR created_at <= ?)
        GROUP BY day
        ORDER BY day  ASC`, 
    [(params.key || null), (params.key || null), from, from, to, to]).then(function(rows) {
        const result = {
            data: {
                items: rows[0]
            }
        }
        res.status(200).json(result);
    }).catch(function(err) {
        next(err);
    });
}

export default {
    getLogs,
    postEvent,
    deleteEvents,
    deleteEvent,
    getEventKeys,
    filterEvents
}