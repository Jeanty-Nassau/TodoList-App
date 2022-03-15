import React, { useEffect, useState } from 'react'
import { updateTodoTitle } from '../redux/todoSlice';

/** Component accept text, placeholder values and also pass what type of Input - input, 
* textarea so that we can use it for styling accordingly
*/
function EditableLable({ text, type, placeholder, children, childRef, textSize, ...props }) {
  /**
    * Manage the state whether to show the label or the input box. By default, label will be shown.
    * Exercise: It can be made dynamic by accepting initial state as props outside the component 
    */
  const [isEditing, setEditing] = useState(false);

  // Event handler while pressing any key while editing
  const handleKeyDown = (event, type) => {
    // Handle when key is pressed
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey]; // All keys array
    if (allKeys.indexOf(key) > -1) {
      setEditing(false);
    }

  };

  /** 
  * using use effect, when isEditing state is changing, check whether it is set to true, if true, then focus on the reference element
  */
  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  /*
  - It will display a label is `isEditing` is false
  - It will display the children (input or textarea) if `isEditing` is true
  - when input `onBlur`, we will set the default non edit mode
  Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
  */

  return (
    <section {...props} className='w-full'>
      {isEditing ? (
        <div className='w-full grow' onBlur={() => setEditing(false)} onKeyDown={e => handleKeyDown(e, type)} >
          {children}
        </div>
      ) : (
          <div onDoubleClick={() => setEditing(true)} className={`${textSize} ml-4 `}>
            <span >
            {text || placeholder || 'Editable content'}
          </span>
        </div>
      )}
    </section>
  );
}

export default EditableLable