import React, {useEffect, ReactNode} from 'react';
import './style.css';
import PropTypes from "prop-types";

interface SpModalProps {
    children: ReactNode;
    title?: string | ReactNode;
    visible: boolean;
    closeHandler: () => void;
}

/**
 * Component definition
 */

const SpModal: React.FC<SpModalProps> = ({children, title, visible, closeHandler}) => {
    let headerContent = null;

    /**
     @function
     @param {string|ReactNode} content - The content to be formatted as a header. Can be a string or a ReactNode.
     @returns {JSX.Element} - Returns a formatted header, either a string wrapped in a paragraph element or the original ReactNode.
     */
    const formatHeaderContent = (content:string | ReactNode) => content === 'string' ? <p>{content}</p> : content;
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

        if (title) {
            headerContent = formatHeaderContent(title);
        }

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
                        {headerContent}
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
