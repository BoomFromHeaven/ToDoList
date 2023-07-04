/* eslint-disable no-unused-vars */
import {
  Row,
  Col,
  Typography,
  Button,
  Card,
  Checkbox,
  Modal,
  Input,
} from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CloseCircleTwoTone,
  EditOutlined,
  UpCircleTwoTone,
  DownCircleTwoTone,
} from "@ant-design/icons";
import {
  changeToDoOrder,
  compliteToDo,
  deleteToDo,
  addToDo,
} from "../store/Slices/toDoListSlice";

function ToDoList() {
  const toDoList = useSelector((state) => state.toDoList);
  const dispatch = useDispatch();
  const [newToDo, setNewToDo] = useState("");
  const [modal, setModal] = useState({
    everyDay: false,
    global: false,
  });
  const [editOrder, setEditOrder] = useState({
    everyDay: false,
    global: false,
  });
  const list = ["everyDay", "global"];
  return (
    <Row className="row-margin">
      {list.map((toDoType) => {
        return (
          <Col span={9} offset={2} key={toDoType}>
            <Card
              title={
                <div className="card-title">
                  <Typography.Title level={3}>
                    {toDoType == "everyDay" ? "Ежедневные" : "Глобальные"}
                  </Typography.Title>
                  <Button
                    type="link"
                    onClick={() => {
                      setEditOrder({
                        ...editOrder,
                        [toDoType]: !editOrder[toDoType],
                      });
                    }}
                  >
                    {editOrder[toDoType] ? "Сохранить" : "Изменить порядок"}
                    {editOrder[toDoType] ? null : <EditOutlined></EditOutlined>}
                  </Button>
                </div>
              }
            >
              {toDoList[toDoType].map((element) => {
                return (
                  <div
                    key={element.name}
                    className="container"
                    style={{
                      backgroundColor: element.complited
                        ? "rgb(186 157 255 / 77%)"
                        : null,
                    }}
                  >
                    <Row className="element-row">
                      <Col span={2} className="button-margin">
                        {editOrder[toDoType] ? (
                          element.index != 0 && (
                            <UpCircleTwoTone
                              onClick={() => {
                                dispatch(
                                  changeToDoOrder({
                                    toDoType: toDoType,
                                    index: element.index,
                                    direction: -1,
                                  })
                                );
                              }}
                              style={{ transform: "scale(2.5)" }}
                            ></UpCircleTwoTone>
                          )
                        ) : (
                          <Checkbox
                            style={{ transform: "scale(2)" }}
                            checked={element.complited}
                            onClick={() => {
                              dispatch(
                                compliteToDo({
                                  toDoType: toDoType,
                                  index: element.index,
                                })
                              );
                            }}
                          ></Checkbox>
                        )}
                      </Col>
                      <Col span={20}>
                        <Typography.Title
                          level={2}
                          style={{ textAlign: "center", margin: "0px" }}
                        >
                          {element.name}
                        </Typography.Title>
                      </Col>
                      <Col span={1} offset={1} style={{ margin: "auto" }}>
                        {editOrder[toDoType] ? (
                          <>
                            {element.index != toDoList[toDoType].length - 1 && (
                              <DownCircleTwoTone
                                onClick={() => {
                                  dispatch(
                                    changeToDoOrder({
                                      toDoType: toDoType,
                                      index: element.index,
                                      direction: 1,
                                    })
                                  );
                                }}
                                style={{ transform: "scale(2.5)" }}
                              ></DownCircleTwoTone>
                            )}
                          </>
                        ) : (
                          <CloseCircleTwoTone
                            style={{ transform: "scale(2.5)" }}
                            onClick={(event) => {
                              dispatch(
                                deleteToDo({
                                  toDoType: toDoType,
                                  index: element.index,
                                })
                              );
                            }}
                          />
                        )}
                      </Col>
                    </Row>
                  </div>
                );
              })}
              <Button
                style={{
                  transform: "scale(1.8)",
                  marginTop: "20px",
                  marginLeft: "45%",
                }}
                type="primary"
                shape="round"
                onClick={() => {
                  setModal({ ...modal, [toDoType]: !modal[toDoType] });
                }}
              >
                Добавить
              </Button>
              <Modal
                title={
                  toDoType == "everyDay"
                    ? "Создать ежедневную задачу"
                    : "Создать глобальную задачу"
                }
                open={modal[toDoType]}
                onOk={() => {
                  setModal({ ...modal, [toDoType]: false });
                  dispatch(addToDo({ name: newToDo, toDoType: toDoType }));
                  setNewToDo("");
                  console.log(toDoList);
                }}
                onCancel={() => {
                  setModal({ ...modal, [toDoType]: false });
                  setNewToDo("");
                }}
              >
                <Input
                  value={newToDo}
                  onChange={(event) => {
                    setNewToDo(event.target.value);
                  }}
                ></Input>
              </Modal>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
export default ToDoList;
