let model = {
            "optimize": "cost",
            "opType": "min",
            "constraints": {
                "protein": { "min": 30 },
                "energy": { "min": 250 },
                "calcium": { "min": 50, "max": 150 },
                "weight": { "max": 100 },
                "fishmeal": {"min": 27} 
            },
            "variables": {
                "maize": {
                    "protein": 9,
                    "energy": 1.1,
                    "calcium": 0.02,
                    "weight": 1,
                    "cost": 2.15,
                    "maize": 1
                },
                "fishmeal": {
                   "protein": 65,
                    "energy": 3.9,
                    "calcium": 3.7,
                    "weight": 1,
                    "cost": 8,
                    "fishmeal": 1
                },
                "soymeal": {
                   "protein": 44,
                    "energy": 2.57,
                    "calcium": 0.3,
                    "weight": 1,
                    "cost": 6
                },
                "ricebran": {
                   "protein": 12,
                    "energy": 1.99,
                    "calcium": 0.1,
                    "weight": 1,
                    "cost": 2
                },
                "limestone": {
                   "protein": 0,
                    "energy": 0,
                    "calcium": 38,
                    "weight": 1,
                    "cost": 0.4
                }
            },
        };