import React, { useEffect, useState } from "react";
import "./myList.scss";
import ReactPaginate from "react-paginate";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TASK, MY_LIST, UPDATE_TASK } from "../../utils/queries";
import { useDispatch, useSelector } from "react-redux";
import ListPopUp from "./ListPopUp";
import moment from "moment/moment";
import { alertActions } from "../../store/alert-slice";
import { v4 as uuid } from "uuid";
import Spinner from "../../components/Spinner";

function MyList() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  const [isUpdate, setUpdate] = useState(false);
  const [isPost, setIsPost] = useState(false);

  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const [addTask] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      handleCloseModel();
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

  const [updateTask] = useMutation(UPDATE_TASK, {
    onCompleted: () => {
      handleCloseModel();
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

  const { loading, error, data, refetch } = useQuery(MY_LIST, {
    variables: { page: currentPage },
  });

  useEffect(() => {
    if (!loading && !error && data) {
      setTotalPages(data.posts.totalPages);
    }
    if (!isModelOpen) {
      refetch();
    }
  }, [data, error, loading, isModelOpen, refetch]);
  function timing(idd) {
    setTimeout(() => dispatch(alertActions.REMOVE_ALERT(idd)), 5000);
  }

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };
  const handleUpdateClick = (post, e) => {
    e.preventDefault();
    console.log(post);
    setSelectedTask(post);
    setIsModelOpen(true);
    setUpdate(true);
    setIsPost(false);
  };
  const handleAddClick = (e) => {
    e.preventDefault();
    setSelectedTask();
    setIsModelOpen(true);
    setUpdate(false);
    setIsPost(true);
  };

  const handleCloseModel = () => {
    setIsModelOpen(false);
    setUpdate(false);
    setIsPost(false);
  };

  const handleUpdate = ({ id, name, description }) => {
    updateTask({
      variables: {
        id: id,
        title: name,
        content: description,
      },
    });
  };

  const handleAdd = ({ name, description }) => {
    console.log(name);
    addTask({
      variables: {
        title: name,
        content: description,
      },
    });
  };
  return (
    <>
      {loading ? (
        <>
          <Spinner />{" "}
        </>
      ) : (
        <>
          <div className="containerr">
            {isAuth ? (
              <>
                <h1>Todo List</h1>
                <ul className="list">
                  <li
                    style={{ zIndex: "999" }}
                    onClick={(e) => handleAddClick(e)}
                    value="Add Task"
                  >
                    {" "}
                    Add Task
                  </li>
                </ul>
                <ul className="list">
                  {data?.posts.posts?.map((post) => (
                    <li
                      key={post._id}
                      className="big list-item"
                      onClick={(e) => handleUpdateClick(post, e)}
                    >
                      <div className="rightcorner">
                        <strong> {post.title} : </strong>
                        {post.content}
                      </div>
                      <div className="leftcorner">
                        {moment(post?.createdAt).format("DD-MM-YYYY")}
                        {post?.updatedAt &&
                          ` | ${moment(post?.updatedAt).format("DD-MM-YYYY")}`}
                      </div>
                    </li>
                  ))}
                </ul>
                {currentPage > 0 && (
                  <ReactPaginate
                    pageCount={totalPages}
                    onPageChange={(selected) => handlePageChange(selected)}
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    containerClassName={"pagination-container"}
                    activeClassName={"active-page"}
                    className="pagination-component"
                  />
                )}
                {isModelOpen && (
                  <>
                    <div className="model">
                      <div className="model-content">
                        <ListPopUp
                          isUpdate={isUpdate}
                          isPost={isPost}
                          isOpen={isModelOpen}
                          task={selectedTask}
                          onClose={handleCloseModel}
                          onSubmit={handleUpdate}
                          onAdd={handleAdd}
                        />
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <h1>Not Authenticated</h1>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default MyList;
