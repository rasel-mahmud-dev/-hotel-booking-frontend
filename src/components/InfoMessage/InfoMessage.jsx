import * as PropTypes from "prop-types";

import "./info.scss"

function InfoMessage({className = "", status = "success", message = ""}) {
    return message && (
        <div className={`${className} info-message info-${status}`}>
            {message}
        </div>
    )
}

InfoMessage.propTypes = {
    message: PropTypes.string,
    status: PropTypes.string
};

export default InfoMessage