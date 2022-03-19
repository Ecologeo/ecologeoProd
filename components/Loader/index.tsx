import React, { Component } from 'react'
import './styles.css';
import LoaderComponent from "react-loader-spinner";

export default class Loader extends Component<{ isloadin: boolean }> {

    render() {
        return (
            <>
                {this.props.isloadin ? (
                    <div className="container">
                        <LoaderComponent
                            type="ThreeDots"
                            color="#3CB371"
                            height={100}
                            width={100}
                        />
                    </div>
                ) : (
                    <></>
                )}
            </>



        )
    }
}
