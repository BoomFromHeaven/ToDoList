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
function Content() {
  const [modalEveryDay, setModalEveryDay] = useState(false);
  const [modalGlobal, setModalGlobal] = useState(false);
  const [newToDoName, setNewToDoName] = useState("");
  const everyDayToDo = useSelector((state) => state.everyDayToDo);
  const GlobalToDo = useSelector((state) => state.globalToDo);
  const dispatch = useDispatch();
  return (
    <>
      <Row>
        <Col span={9} offset={2}>
          <Card title="Каждый день">
            {everyDayToDo.map((element) => {
              return (
                <div
                  key={element.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Checkbox
                    checked={element.complited}
                    onClick={() => {
                      dispatch(CompliteEveryDayToDo(element.name));
                    }}
                  ></Checkbox>
                  <Typography.Title style={{ marginLeft: "40px" }}>
                    {element.name}
                  </Typography.Title>
                  <Button
                    name={element.name}
                    type="primary"
                    shape="round"
                    onClick={(event) => {
                      dispatch(DeleteEveryDayToDo(event.target.name));
                    }}
                  >
                    <span style={{ pointerEvents: "none" }}>Delete</span>
                  </Button>
                </div>
              );
            })}
            <Button
              type="primary"
              shape="round"
              onClick={() => {
                setNewToDoName("");
                setModalEveryDay(true);
              }}
            >
              Create New
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
          </Card>
        </Col>
        <Col span={9} offset={2}>
          <Card title="Глобальные">
            {GlobalToDo.map((element) => {
              return (
                <div
                  key={element.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Checkbox
                    checked={element.complited}
                    onClick={() => {
                      dispatch(CompliteGlobalToDo(element.name));
                    }}
                  ></Checkbox>
                  <Typography.Title style={{ marginLeft: "40px" }}>
                    {element.name}
                  </Typography.Title>
                  <Button
                    name={element.name}
                    type="primary"
                    shape="round"
                    onClick={(event) => {
                      dispatch(DeleteGlobalToDo(event.target.name));
                    }}
                  >
                    <span style={{ pointerEvents: "none" }}>Delete</span>
                  </Button>
                </div>
              );
            })}
            <Button
              type="primary"
              shape="round"
              onClick={() => {
                setNewToDoName("");
                setModalGlobal(true);
              }}
            >
              Create New
            </Button>
            <Modal
              title="Создать глобальную задачу"
              open={modalGlobal}
              onOk={() => {
                if (newToDoName != ""){ dispatch(AddGlobalToDo(newToDoName));}
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
