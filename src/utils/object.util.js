'use strict';

const _ = require('lodash');

// filter data with specificed fields
const getInfoData = ({ fields = [], object = {} }) => {
    // object = []
    if( Array.isArray( object )) return object.map(item => _.pick(item, fields)); 

    // object = {}
    return _.pick(object, fields)
}

module.exports = {
    getInfoData, 
}