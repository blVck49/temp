const name = {
    "message": "My Rule-Validation API",
    "status": "success",
    "data": {
      "name": "Tope Adebiyi",
      "github": "@blVck49",
      "email": "topeadebiyi@outlook.com",
      "mobile": "08169174017",
      "twitter": ""
    }
}
  
const types = {
    "field": function (){
      return "string";
    }, 
    "condition": function (){
      return "string";
    }, 
    "condition_value": function(cond){
      if (cond.includes('eq')){
        return ['string', "number"]
      }
      return cond==="contains"? "string": "number"; 
    }
}
    
const operators = {
    'eq': function(conditionValue, fieldTypeVAlue){ return conditionValue === fieldTypeVAlue},
    'neq': function(conditionValue, fieldTypeVAlue){ return conditionValue !== fieldTypeVAlue},
    'gt': function(conditionValue, fieldTypeVAlue){ return conditionValue > fieldTypeVAlue},
    'gte': function(conditionValue, fieldTypeVAlue){ return conditionValue >= fieldTypeVAlue},
    'contains': function(conditionValue, fieldTypeVAlue){ 
      return (fieldTypeVAlue.includes(conditionValue))
    }
}

module.exports = {name, types, operators}