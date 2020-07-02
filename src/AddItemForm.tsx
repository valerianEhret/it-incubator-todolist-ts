import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

type AddItemFormPropsType = {
    addItem: (title:string) => void
}


export function AddItemForm(props:AddItemFormPropsType) {

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addItem(title);
        }
    }

    const onAddItemClick = () => {
        if(title.trim() !== "") {
            props.addItem(title);
        } else {
            setError("Title is required")
        }
        setTitle("")
    }

    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <button onClick={onAddItemClick}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}

