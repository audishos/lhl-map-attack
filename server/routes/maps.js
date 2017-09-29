"use strict";

const express = require('express');
const bodyParser  = require("body-parser");
const router  = express.Router();
{/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBILOdZLJBP1ajrPSIzG6VZajst3WCW77k&callback=initMap"
async defer></script> */}

module.exports = (DataHelpers) => {

    //--------------------------SHOW ALL MAPS------------------------------------
    router.get("/", (req, res) => {
        console.log("ayyyy");
        DataHelpers.getMaps((results)=>{
            res.send(results);
        });
    });

    //--------------------------ADD A MAP------------------------------------
    router.get("/new", (req, res) =>{
        res.render("../views/create-map");
        return;
    })
    //hard coded user id
    router.post("/", (req, res) =>{
        DataHelpers.addMap(req.body.map_name, req.body.description, 2,(err, results, mapid) =>{
            if(err){
                console.log(err);
                console.log("error adding map to database");
                res.status(503).send();
                return;
            }
            res.redirect("/maps/"+mapid);
        });
    })
    //----------------------------Get info on specifc map-------------------
    router.get("/:mapid", (req, res) => {
        DataHelpers.getMapObject(req.params.mapid, (error, results)=>{
            console.log(error);
            if(error){
                res.status(500).send()
                return;
            }
            res.send(results)
        });
    });
    //--------------------------SHOW Specific Map------------------------------------
    router.get("/:mapid/view", (req, res) => {
        DataHelpers.getMapObject(req.params.mapid, (error, results)=>{
            console.log(error);
            if(error){
                res.status(500).send()
                return;
            }
            console.log(results);
            res.render("view.ejs",{
                results: results
            })
        });
    });
    //--------------------------EDIT Page for Specific Map--------------------------------
    router.get("/:mapid/edit", (req, res) =>{
        DataHelpers.getMapObject(req.params.mapid, (error, results)=>{
            console.log(error);
            if(error){
                res.status(500).send()
                return;
            }
            if(results){
                let templateVars = {maps:results[0]}
                res.render("edit-map.ejs",{
                    templateVars: templateVars
                })
            }
        });
    });
    //--------------------------EDIT Specific Map------------------------------------
    router.put("/:mapid", (req, res) => {
    });

    //--------------------------DELETE Specific Map------------------------------------
    router.delete("/:mapid", (req, res) => {
    });

    //--------------------------LIST Points from Specific Map------------------------------------
    router.get("/:mapid/points", (req, res) => {
        DataHelpers.getPointsOnMap(req.params.mapid, (error, results)=>{
            console.log(error);
            if(error){
                res.status(500).send()
                return;
            }
            res.send(results);
        });
    });

    //--------------------------LIST Points for Specific User------------------------------------
    //questionable
    router.get("/points", (req, res) => {
    });

    //--------------------------LIST Points for Specific Map------------------------------------
    router.post("/:mapid/points", (req, res) => {
    });

    //--------------------------EDIT Specific Point------------------------------------
    router.put("/points/:pointid", (req, res) => {
    });

    //--------------------------DELETE Specific Point------------------------------------
    router.delete("/points/:pointid", (req, res) => {
    });

    return router;
}
