import React from "react";
import Asset from "./Asset";
import style from "../css/PageNotFound.module.css"
import notfound from "../assets/404.jpg"

const PageNotFound = () => {
    return (
    <div className={style.NotFound}>
        <Asset src={notfound} message={"Sorry the page you a looking for doesn't exist"} />
    </div>
)}

export default PageNotFound
