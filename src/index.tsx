import React, {useEffect, ReactNode} from 'react';
import './style.css';
import PropTypes from "prop-types";

interface SpModalProps {
    children: ReactNode;
    title?: string | ReactNode;
    visible: boolean;
    closeHandler: (e?: any) => void;
}

/**
 * Component definition
 */

const SpModal: React.FC<SpModalProps> = ({children, title, visible, closeHandler}) => {
    const formatHeaderContent = (content:string | ReactNode) => {
        return typeof content === 'string' ? <p>{content}</p> : content;
    }
    const outsideClickHandler = (e:any) => {
        if (e.target.classList.contains('hd-modal')) {
            closeHandler();
        }
    }

    const escapeKeyHandler = (e:KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', escapeKeyHandler);

        return () => {
            document.removeEventListener('keydown', escapeKeyHandler);
        }
    })

    return (
        <div className={`sp-modal${visible ? ' --opened' : ''}`} onClick={outsideClickHandler}>
            <div className="sp-modal__wrapper">
                <button className="sp-modal__close" onClick={closeHandler}>
                    X
                </button>
                {
                    title &&
                    <div className={"sp-modal__header"}>
                        {formatHeaderContent(title)}
                    </div>
                }
                <div className="sp-modal__body">
                    {children}
                </div>
            </div>
        </div>
    );
};

/**
 * Set props types
 */

SpModal.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    visible: PropTypes.bool.isRequired,
    closeHandler: PropTypes.func.isRequired
}

/**
 * Init and export
 */
export default SpModal;
