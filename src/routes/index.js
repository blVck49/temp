const router = require("express").Router();
const { name, types, operators } = require("../constants");

module.exports = function() {
  router.get("/", (req, res) => res.send(name)); 
  
  router.post("/validate-rule", (req, res) => {
    const body = req.body;
    for (const val of ["field", "condition", "condition_value"]) {
      // Error 1 for availability of Rule fields
      if (!(val in body.rule)) {
        res.status(400).send({
          "message": `${val} is required.`,
          "status": "error",
          "data": null
        })
        return;
      } 
      // Error 2 for type of Rule fields
      let type = types[val](body.rule.condition);
      if (!type.includes(typeof(body.rule[val]))){
        res.status(400).send({
          "message": `${val} should be a|an ${type}.`,
          "status": "error",
          "data": null
        })
        return;
      }
    }

    // Error 3 for field is missing from data
    const {field, condition, condition_value} = req.body.rule;
    if (body.data[field]===undefined) {
        res.status(400).send({
        "message": `field ${field} is missing from data.`,
        "status": "error",
        "data": null
        })
        return;
    }

    // Error 4 for if validation fails
    if (!operators[condition](condition_value, req.body.data[field])){
      res.status(400).send({
        "message": `field ${field} failed validation.`,
        "status": "error",
        "data": {
          "validation": {
            "error": true,
            "field": `${field}`,
            "field_value": `${body.data[field]}`,
            "condition": `${condition}`,
            "condition_value": `${condition_value}`
          }
        }
      })
      return;
    }
    
    // Success Message
    res.status(200).send({
      "message": `field ${field} succesfully validated.`,
      "status": "success",
      "data": {
        "validation": {
          "error": false,
          "field": `${field}.`,
          "field_value": `${body.data[field]}`,
          "condition": `${condition}`,
          "condition_value": `${condition_value}`
        }
      }
    })
    return    
  });
  return router;
}

