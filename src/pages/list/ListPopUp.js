import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { DELETE_TASK } from "../../utils/queries";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { alertActions } from "../../store/alert-slice";

const ListPopUp = ({
  task,
  isOpen,
  onClose,
  onSubmit,
  isUpdate,
  isPost,
  onAdd,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(task?.title);
  const [description, setdescription] = useState(task?.content);

  const [deleteTask] = useMutation(DELETE_TASK, {
    onCompleted: () => {
      onClose();
    },
    onError: (error) => {
      var idd = uuid();
      dispatch(
        alertActions.SET_ALERT({
          id: idd,
          msg: error.message,
          type: "danger",
        })
      );
      timing(idd);
    },
  });

  function timing(idd) {
    setTimeout(() => dispatch(alertActions.REMOVE_ALERT(idd)), 5000);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPost) {
      onAdd({ name, description });
    } else if (isUpdate) {
      onSubmit({ id: task._id, name, description });
    }
  };

  const handledelete = (e) => {
    e.preventDefault();
    deleteTask({
      variables: {
        id: task._id,
      },
    });
  };
  return isOpen ? (
    <div className="popup ">
      <div className="popup-content">
        <form onSubmit={(e) => handleSubmit(e)} className="login-form">
          <div className="flex-row">
            <label className="lf--label">Title</label>
            <input
              type="text"
              className="lf--input"
              name="name"
              autoComplete="off"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex-row">
            <label className="lf--label">Task</label>
            <textarea
              type="text"
              className="lf--textarea"
              name="description"
              autoComplete="off"
              defaultValue={description}
              onChange={(e) => setdescription(e.target.value)}
            />
          </div>
          <ul className="list" style={{ justifyContent: "center" }}>
            {isUpdate && (
              <>
                <li>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </li>
                <li>
                  <button
                    onClick={(e) => handledelete(e)}
                    className="btn btn-primary"
                  >
                    delete
                  </button>
                </li>
              </>
            )}
            {isPost && (
              <li>
                <button type="submit" className="btn btn-primary">
                  Add Task
                </button>
              </li>
            )}
            <li>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
                className="btn btn-primary"
              >
                Close
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  ) : null;
};

export default ListPopUp;
