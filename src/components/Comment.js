import React from "react";
import IconTrash from "./TrashIcon";

export default function Comment(props) {
    const { name, message, avatarURL, time } = props.comment;

    return (
        <div className="media mb-3">
            <img
                className="mr-3 bg-light rounded"
                width="48"
                height="48"
                src={avatarURL}
                alt={name}
            />

            <div className="media-body p-2 shadow-sm rounded bg-light border">
                <small className="float-right text-muted">{time}</small>
                <h6 className="mt-0 mb-1 text-muted">{name}</h6>
                {message}
            </div>

            <button onClick={() => props.delete(props.comment)}><IconTrash /></button>
        </div>
    );
}