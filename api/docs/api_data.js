define({ "api": [
  {
    "type": "get",
    "url": "/auth/google",
    "title": "AUTHENTICATE USING GOOGLE",
    "name": "AuthGoogle",
    "group": "Auth",
    "version": "0.0.0",
    "filename": "src/routes/auth.ts",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/auth/google"
      }
    ]
  },
  {
    "type": "get",
    "url": "/auth/google",
    "title": "AUTHENTICATE USING GOOGLE",
    "name": "AuthGoogle",
    "group": "Auth",
    "version": "0.0.0",
    "filename": "src/routes/auth.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/auth/google"
      }
    ]
  },
  {
    "type": "get",
    "url": "/auth/google/callback",
    "title": "GOOGLE CALLBACK",
    "name": "AuthGoogleCallback",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/auth.ts",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/auth/google/callback"
      }
    ]
  },
  {
    "type": "get",
    "url": "/auth/google/callback",
    "title": "GOOGLE CALLBACK",
    "name": "AuthGoogleCallback",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/auth.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/auth/google/callback"
      }
    ]
  },
  {
    "type": "get",
    "url": "/auth/verify",
    "title": "VERIFY A JSON WEB TOKEN",
    "name": "AuthVerify",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JSON Web Token (JWT) (RFC 7519).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>If valid token, returns true, otherwise false.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/auth.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/auth/verify"
      }
    ]
  },
  {
    "type": "get",
    "url": "/auth/verify",
    "title": "VERIFY A JSON WEB TOKEN",
    "name": "AuthVerify",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JSON Web Token (JWT) (RFC 7519).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>If valid token, returns true, otherwise false.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/auth.ts",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/auth/verify"
      }
    ]
  },
  {
    "type": "post",
    "url": "/feedstuff/createforuser",
    "title": "CREATE FEEDSTUFF FOR USER",
    "name": "FeedstuffCreateForUser",
    "group": "Feedstuff",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/feedstuff.ts",
    "groupTitle": "Feedstuff",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/feedstuff/createforuser"
      }
    ]
  },
  {
    "type": "post",
    "url": "/feedstuff/createforuser",
    "title": "CREATE FEEDSTUFF FOR USER",
    "name": "FeedstuffCreateForUser",
    "group": "Feedstuff",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "response",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/feedstuff.js",
    "groupTitle": "Feedstuff",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/feedstuff/createforuser"
      }
    ]
  },
  {
    "type": "get",
    "url": "/feedstuff/list",
    "title": "RETRIEVE LIST OF FEEDSTUFFS",
    "name": "FeedstuffList",
    "group": "Feedstuff",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "response",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/feedstuff.ts",
    "groupTitle": "Feedstuff",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/feedstuff/list"
      }
    ]
  },
  {
    "type": "get",
    "url": "/feedstuff/list",
    "title": "RETRIEVE LIST OF FEEDSTUFFS",
    "name": "FeedstuffList",
    "group": "Feedstuff",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "response",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/feedstuff.js",
    "groupTitle": "Feedstuff",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/feedstuff/list"
      }
    ]
  },
  {
    "type": "get",
    "url": "/feedstuff/listExample",
    "title": "RETRIEVE LIST OF EXAMPLE FEEDSTUFFS",
    "name": "FeedstuffListExample",
    "group": "Feedstuff",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "response",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/feedstuff.ts",
    "groupTitle": "Feedstuff",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/feedstuff/listExample"
      }
    ]
  },
  {
    "type": "get",
    "url": "/feedstuff/listExample",
    "title": "RETRIEVE LIST OF EXAMPLE FEEDSTUFFS",
    "name": "FeedstuffListExample",
    "group": "Feedstuff",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "response",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/feedstuff.js",
    "groupTitle": "Feedstuff",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/feedstuff/listExample"
      }
    ]
  },
  {
    "type": "get",
    "url": "/feedstuff/listforuser",
    "title": "RETRIEVE LIST OF FEEDSTUFFS FOR USER",
    "name": "FeedstuffListForUser",
    "group": "Feedstuff",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "response",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/feedstuff.ts",
    "groupTitle": "Feedstuff",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/feedstuff/listforuser"
      }
    ]
  },
  {
    "type": "get",
    "url": "/feedstuff/listforuser",
    "title": "RETRIEVE LIST OF FEEDSTUFFS FOR USER",
    "name": "FeedstuffListForUser",
    "group": "Feedstuff",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "response",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/feedstuff.js",
    "groupTitle": "Feedstuff",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/feedstuff/listforuser"
      }
    ]
  },
  {
    "type": "get",
    "url": "/feedstuff/suggestedValues",
    "title": "RETRIEVE SUGGESTED VALUES",
    "name": "FeedstuffSuggestedValues",
    "group": "Feedstuff",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "formulaId",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "feedstuffId",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "minumum",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "maximum",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/feedstuff.ts",
    "groupTitle": "Feedstuff",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/feedstuff/suggestedValues"
      }
    ]
  },
  {
    "type": "get",
    "url": "/feedstuff/suggestedValues",
    "title": "RETRIEVE SUGGESTED VALUES",
    "name": "FeedstuffSuggestedValues",
    "group": "Feedstuff",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "formulaId",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "feedstuffId",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "minumum",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "maximum",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/feedstuff.js",
    "groupTitle": "Feedstuff",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/feedstuff/suggestedValues"
      }
    ]
  },
  {
    "type": "get",
    "url": "/formula/list",
    "title": "RETRIEVE LIST OF FORMULAS",
    "name": "FormulaList",
    "group": "Formula",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "response",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/formula.js",
    "groupTitle": "Formula",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/formula/list"
      }
    ]
  },
  {
    "type": "get",
    "url": "/formula/list",
    "title": "RETRIEVE LIST OF FORMULAS",
    "name": "FormulaList",
    "group": "Formula",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "response",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/formula.ts",
    "groupTitle": "Formula",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/formula/list"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/formulator/formulate",
    "title": "RETRIEVE LIST OF FORMULAS",
    "name": "FormulatorFormulate",
    "group": "Formulator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "feedstuffs",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "formulaId",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "currencyCode",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "cost",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "feasible",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/formulator.js",
    "groupTitle": "Formulator",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/formulator/formulate"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/formulator/formulate",
    "title": "RETRIEVE LIST OF FORMULAS",
    "name": "FormulatorFormulate",
    "group": "Formulator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "feedstuffs",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "formulaId",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "currencyCode",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "cost",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "feasible",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/formulator.ts",
    "groupTitle": "Formulator",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/formulator/formulate"
      }
    ]
  },
  {
    "type": "get",
    "url": "/formulator/formulation",
    "title": "RETRIEVE LIST OF FORMULAS",
    "name": "FormulatorFormulation",
    "group": "Formulator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "formulationId",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "feedstuffs",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "composition",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "formula",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "feasible",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "cost",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/formulator.js",
    "groupTitle": "Formulator",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/formulator/formulation"
      }
    ]
  },
  {
    "type": "get",
    "url": "/formulator/formulation",
    "title": "RETRIEVE LIST OF FORMULAS",
    "name": "FormulatorFormulation",
    "group": "Formulator",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "formulationId",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "feedstuffs",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "composition",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "formula",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "feasible",
            "description": "<p>Empty.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "cost",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/formulator.ts",
    "groupTitle": "Formulator",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/formulator/formulation"
      }
    ]
  },
  {
    "type": "get",
    "url": "/formulator/formulations",
    "title": "RETRIEVE LIST OF FORMULATIONS",
    "name": "FormulatorFormulations",
    "group": "Formulator",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "response",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/formulator.js",
    "groupTitle": "Formulator",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/formulator/formulations"
      }
    ]
  },
  {
    "type": "get",
    "url": "/formulator/formulations",
    "title": "RETRIEVE LIST OF FORMULATIONS",
    "name": "FormulatorFormulations",
    "group": "Formulator",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "response",
            "description": "<p>Empty.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/formulator.ts",
    "groupTitle": "Formulator",
    "sampleRequest": [
      {
        "url": "https://worldofrations.com/api/formulator/formulations"
      }
    ]
  }
] });
