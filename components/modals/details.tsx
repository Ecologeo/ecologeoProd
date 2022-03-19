import React from 'react';
import styles from './style.module.scss';
import PropTypes from 'prop-types';
import { FaWindowClose, FaArrowLeft } from "react-icons/fa";

export default function useModal(props: any) {
    const onClose = (e: any) => {
        props.onClose && props.onClose(e);
    };

    const onBack = (e: any) => {
        props.onBack && props.onBack(e);
    };

    const send = (e: any) => {
        props.onSubmit && props.onSubmit(e);
    };

    return (
        <>
            {props.show ?
                <div className="modal-parent">

                    <div className="modal" id="modal">
                        <div className="h2">
                            {props.option > 1?
                            <FaArrowLeft
                            onClick={onBack}   
                            size={25}
                            className="backButton" />:null
                            }
                            <span>{props.title}</span>{' '}
                            <FaWindowClose 
                                onClick={onClose}
                                className="closeModal"
                                size={25}
                            />
                        </div>
                        <form onSubmit={send}>
                            <div className="content">{props.render}</div>
                        </form>
                    </div>
                </div> :
                null
            }

        </>

    );

}
