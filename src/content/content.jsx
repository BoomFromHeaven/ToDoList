import {
  Button,
  Card,
  Checkbox,
  Col,
  Input,
  Modal,
  Typography,
  Row,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  AddEveryDayToDo,
  ChangeEveryDayOrder,
  CompliteEveryDayToDo,
  DeleteEveryDayToDo,
} from "../store/Slices/everyDayToDoSlice";
import { useState } from "react";
import {
  AddGlobalToDo,
  ChangeGlobalOrder,
  CompliteGlobalToDo,
  DeleteGlobalToDo,
} from "../store/Slices/globalToDoSlice";
import {
  CloseCircleTwoTone,
  EditOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  UpCircleTwoTone,
  DownCircleTwoTone,
} from "@ant-design/icons";
function Content() {
  const [modalEveryDay, setModalEveryDay] = useState(false);
  const [modalGlobal, setModalGlobal] = useState(false);
  const [newToDoName, setNewToDoName] = useState("");
  const [orderEveryDay, setOrderEveryDay] = useState(false);
  const [orderGlobal, setOrderGlobal] = useState(false);
  const everyDayToDo = useSelector((state) => state.everyDayToDo);
  const GlobalToDo = useSelector((state) => state.globalToDo);
  const dispatch = useDispatch();
  return (
    <>
      <Row style={{ marginTop: "25px" }}>
        <Col span={9} offset={2}>
          <Card
            title={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography.Title level={3}>{"Ежедневные"}</Typography.Title>
                <Button
                  type="link"
                  onClick={() => {
                    setOrderEveryDay(!orderEveryDay);
                  }}
                >
                  {orderEveryDay ? "Сохранить" : "Изменить порядок"}
                  {orderEveryDay ? null : <EditOutlined></EditOutlined>}
                </Button>
              </div>
            }
          >
            <div>
              {everyDayToDo.map((element) => {
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
                    <Row style={{ marginLeft: "10px" }}>
                      <Col span={2} style={{ margin: "auto 0px" }}>
                        {orderEveryDay ? (
                          element.index != 0 && (
                            <UpCircleTwoTone
                              onClick={() => {
                                dispatch(
                                  ChangeEveryDayOrder({
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
                              dispatch(CompliteEveryDayToDo(element.name));
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
                        {orderEveryDay ? (
                          <>
                            {element.index != everyDayToDo.length - 1 && (
                              <DownCircleTwoTone
                                onClick={() => {
                                  dispatch(
                                    ChangeEveryDayOrder({
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
                              dispatch(DeleteEveryDayToDo(event.target.name));
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
                  setNewToDoName("");
                  setModalEveryDay(true);
                  console.log(everyDayToDo);
                }}
              >
                Добавить
              </Button>
              <Modal
                title="Создать ежедневную задачу"
                open={modalEveryDay}
                onOk={() => {
                  if (newToDoName != "") dispatch(AddEveryDayToDo(newToDoName));
                  setModalEveryDay(false);
                }}
                onCancel={() => {
                  setNewToDoName("");
                  setModalEveryDay(false);
                }}
              >
                <Input
                  value={newToDoName}
                  onChange={(event) => {
                    setNewToDoName(event.target.value);
                  }}
                ></Input>
              </Modal>
            </div>
          </Card>
        </Col>
        <Col span={9} offset={2}>
          <Card
            title={
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography.Title level={3}>{"Глобальные"}</Typography.Title>
                <Button
                  type="link"
                  onClick={() => {
                    setOrderGlobal(!orderGlobal);
                  }}
                >
                  {orderGlobal ? "Сохранить" : "Изменить порядок"}
                  {orderGlobal ? null : <EditOutlined></EditOutlined>}
                </Button>
              </div>
            }
          >
            {GlobalToDo.map((element) => {
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
                  <Row style={{ marginLeft: "10px" }}>
                  <Col span={2} style={{ margin: "auto 0px" }}>
                        {orderGlobal ? (
                          element.index != 0 && (
                            <UpCircleTwoTone
                              onClick={() => {
                                dispatch(
                                  ChangeGlobalOrder({
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
                              dispatch(CompliteGlobalToDo(element.name));
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
                        {orderGlobal ? (
                          <>
                            {element.index != GlobalToDo.length - 1 && (
                              <DownCircleTwoTone
                                onClick={() => {
                                  dispatch(
                                    ChangeGlobalOrder({
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
                              dispatch(DeleteGlobalToDo(event.target.name));
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
                setNewToDoName("");
                setModalGlobal(true);
              }}
            >
              Добавить
            </Button>
            <Modal
              title="Создать глобальную задачу"
              open={modalGlobal}
              onOk={() => {
                if (newToDoName != "") {
                  dispatch(AddGlobalToDo(newToDoName));
                }
                setNewToDoName("");
                setModalGlobal(false);
              }}
              onCancel={() => {
                setNewToDoName("");
                setModalGlobal(false);
              }}
            >
              <Input
                value={newToDoName}
                onChange={(event) => {
                  setNewToDoName(event.target.value);
                }}
              ></Input>
            </Modal>
          </Card>
        </Col>
      </Row>
    </>
  );
}
export default Content;
