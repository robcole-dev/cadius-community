import React from "react";
import Asset from "./Asset";
import style from "../css/PageNotFound.module.css"
import notfound from "../assets/soon.jpg"

const PageNotFound = () => {
    return (
    <div className={style.NotFound}>
        <Asset src={notfound} message={"This page is currently under construction. Please come back later"} />
    </div>
)}

export default PageNotFound
