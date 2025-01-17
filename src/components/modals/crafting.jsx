import React from "react";

import { connect } from "react-redux";

import Modal from "react-bootstrap/Modal";

import TimeBoosterLvl1PNG from "../../assets/img/time_boosters/lvl1.png";
import TimeBoosterLvl2PNG from "../../assets/img/time_boosters/lvl2.png";
import TimeBoosterLvl3PNG from "../../assets/img/time_boosters/lvl3.png";
import TimeBoosterLvl4PNG from "../../assets/img/time_boosters/lvl4.png";
import TimeBoosterLvl5PNG from "../../assets/img/time_boosters/lvl5.png";
import TimeBoosterLvl6PNG from "../../assets/img/time_boosters/lvl6.png";

import CraftingPNG from "../../assets/img/ui/Boton_craft.png";
import BudsPNG from "../../assets/img/ui/BUDS.png";
import XpPNG from "../../assets/img/ui/Icono XP.png";

import XPBoosters from "../../assets/img/xp_boosters";

import FondoPNG from "../../assets/img/ui/Fondo y marco.png";
import xp_boosters from "../../assets/img/xp_boosters";
import { Farm } from "../configs/farming";

import DisplayLoader from "./displayLoader";

function CraftingModal(props) {
  const extractXPBoosters = (boostersObj, range) =>
    Object.keys(boostersObj)
      .slice(range[0], range[1])
      .map((booster) => (
        <div key={booster} className="item">
          <img
            className="booster-image"
            src={boostersObj[booster].image}
            alt={`XP Booster ${booster}`}
          />
          <div className="image-caption-wrapper">
            <div className="image-caption">
              <span>
                <img className="buds" src={BudsPNG} alt="Buds" />{" "}
                <b>{boostersObj[booster].buds}</b>
              </span>
              <span>
                <img className="xp" src={XpPNG} alt="Buds" />{" "}
                <b>{boostersObj[booster].boost}</b>
              </span>
              <span>
                <img
                  onClick={(e) => {
                    mapDispatchToProps(true);

                    let name = ( ""+boostersObj[booster].name).toLowerCase();

                    if(name=="cross"){
                      name = "cross joint"
                    }

                    if(name=="hemp wrapped"){
                      name = "hemp wrapped joint"
                    }

                    if(name=="twax") {
                      name ="twax joint"
                    }

                    boostersObj[booster].name = name

                    let payload = {
                      username:props.username,
                      join:boostersObj[booster],
                      lvl: props.bucket.lvl
                    }

                    props.displayBuyJoint(
                      payload
                    );

                  }}
                  className="crafting-icon highlight-on-hover"
                  src={CraftingPNG}
                  alt="Click to craft"
                />
              </span>
            </div>
          </div>
        </div>
      ));

  const extractTimeBoosters = (boostersObj, range) => {
    const images = {
      lvl1: TimeBoosterLvl1PNG,
      lvl2: TimeBoosterLvl2PNG,
      lvl3: TimeBoosterLvl3PNG,
      lvl4: TimeBoosterLvl4PNG,
      lvl5: TimeBoosterLvl5PNG,
      lvl6: TimeBoosterLvl6PNG,
    };
    return Object.keys(boostersObj)
      .slice(range[0], range[1])
      .map((booster) => (
        <div key={booster} className="item">
          <img
            className="booster-image"
            src={images[booster]}
            alt={`Time Booster ${booster}`}
          />
          <div className="image-caption-wrapper">
            <div className="image-caption">
              <span>
                <img className="buds" src={BudsPNG} alt="Buds" />{" "}
                <b>{boostersObj[booster].buds}</b>
              </span>
              <span>
                <img className="xp" src={XpPNG} alt="Buds" />{" "}
                <b>{boostersObj[booster].boost}</b>
              </span>
              <span>
                <img
                  className="crafting-icon highlight-on-hover"
                  src={CraftingPNG}
                  alt="Click to craft"
                />
              </span>
            </div>
          </div>
        </div>
      ));
  };

  const toggleSubModal = (modal) => {
    modal = document.getElementById(modal);
    const classes = Object.values(modal.classList);
    if (classes.includes("active")) {
      modal.classList.remove("active");
    } else {
      modal.classList.add("active");
    }
  };

  return (
    <>
      <DisplayLoader></DisplayLoader>
      <Modal
        show={props.show}
        onHide={() => props.hideModal("crafting")}
        size={props.size || null}
        centered
        style={{ zIndex: "99999"}}
      >
        <div id="crafting-modal" className="base-modal pb-5">
          <div
            className="w-100 d-flex flex-row justify-content-center"
            style={{ width: "100%" }}
          >
            <span className="modal-title">CRAFT</span>
          </div>
          <div className="d-flex flex-row justify-content-around images-container">
            <div className="item xp">
              <img
                onClick={() =>   toggleSubModal("xpboosters") }
                className="highlight-on-hover xp-boosters-main-img"
                src={xp_boosters.BroncePNG.image}
                alt="XP Boosters"
              />
              <div>
                <h3 style={{fontSize:"smaller"}}>Consumables</h3>
              </div>
            </div>
          </div>
        </div>
        <div id="xpboosters" className="crafting-sub-modal">
          <i
            style={{ borderRadius: "50%" }}
            onClick={() => toggleSubModal("xpboosters")}
            className="fa fa-close fa-2x text-black-50 highlight-on-hover"
          ></i>
          <div className="d-flex flex-row justify-content-around">
            {extractXPBoosters(XPBoosters, [0, 3])}
          </div>
          <div className="d-flex flex-row justify-content-around">
            {extractXPBoosters(XPBoosters, [3, 6])}
          </div>
        </div>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  const bucket = state.API_bucket;

  const timeBooster = state.prices.timeBooster;
  const username = localStorage.getItem("username");
  let displayModalPlanting = state.displayPlantModal;

  return {
    timeBooster,
    username,
    displayModalPlanting,
    bucket
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    plantSeed: (payload) => dispatch({ type: "FARM/PLANT", payload }),
    displayPlanting: (payload) =>
      dispatch({ type: "FARM/DISPLAYPLANTMODAL", payload }),
    displayBuyJoint: (payload) =>
      dispatch({ type: "BUY/JOIN", payload }),
    updateStoreFromAPI: (API_bucket) =>
      dispatch({ type: "API UPDATE", payload: API_bucket }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CraftingModal);
