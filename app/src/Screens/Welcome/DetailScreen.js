import React from 'react';
import {connect} from "react-redux";

const DetailScreen = ({ }) => {


    return (
        <div className="">

        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        Logger: state.Logger,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen);
