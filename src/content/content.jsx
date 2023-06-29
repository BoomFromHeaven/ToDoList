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
  CompliteEveryDayToDo,
  DeleteEveryDayToDo,
} from "../store/Slices/everyDayToDoSlice";
import { useState } from "react";
import {
  AddGlobalToDo,
  CompliteGlobalToDo,
  DeleteGlobalToDo,
} from "../store/Slices/globalToDoSlice";
import { CloseCircleTwoTone } from "@ant-design/icons";
function Content() {
  const [modalEveryDay, setModalEveryDay] = useState(false);
  const [modalGlobal, setModalGlobal] = useState(false);
  const [newToDoName, setNewToDoName] = useState("");
  const everyDayToDo = useSelector((state) => state.everyDayToDo);
  const GlobalToDo = useSelector((state) => state.globalToDo);
  const dispatch = useDispatch();
  return (
    <>
      <Row style={{marginTop:"25px"}}>
        <Col span={9} offset={2}>
          <Card
            title={
              <Typography.Title level={3} style={{ alignItems: "center" }}>
                {"Ежедневные"}
              </Typography.Title>
            }
          >
            <div>
              {everyDayToDo.map((element) => {
                return (
                  <div key={element.name} className="container" style={{backgroundColor: element.complited?"rgb(186 157 255 / 77%)":null}}>
                    <Checkbox
                      style={{ transform: "scale(2)", marginLeft: "20px" }}
                      checked={element.complited}
                      onClick={() => {
                        dispatch(CompliteEveryDayToDo(element.name));
                      }}
                    ></Checkbox>
                    <Typography.Text style={{ transform: "scale(3)" }}>
                      {element.name}
                    </Typography.Text>
                    <CloseCircleTwoTone
                      style={{ transform: "scale(2.5)" }}
                      onClick={(event) => {
                        dispatch(DeleteEveryDayToDo(event.target.name));
                      }}
                    />
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
          <Card title={
              <Typography.Title level={3} style={{ alignItems: "center" }}>
                {"Глобальные"}
              </Typography.Title>
            }>
            {GlobalToDo.map((element) => {
              return (
                <div key={element.name} className="container" style={{backgroundColor: element.complited?"rgb(186 157 255 / 77%)":null}}>
                  <Checkbox
                      style={{ transform: "scale(2)", marginLeft: "20px" }}
                      checked={element.complited}
                      onClick={() => {
                        dispatch(CompliteGlobalToDo(element.name));
                      }}
                    ></Checkbox>
                    <Typography.Text style={{ transform: "scale(3)" }}>
                      {element.name}
                    </Typography.Text>
                    <CloseCircleTwoTone
                      style={{ transform: "scale(2.5)" }}
                      onClick={(event) => {
                        dispatch(DeleteGlobalToDo(event.target.name));
                      }}
                    />
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
