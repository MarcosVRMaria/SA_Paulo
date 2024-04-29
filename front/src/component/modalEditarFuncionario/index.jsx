import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './index.css'
import InputTextDefault from '../inputTextDefault';

function ModalEditarFuncionario({ info }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = () => {
        if (info.select.length > 1 || info.select.length == 0) {
            return alert("Selecione apenas um para editar.")
        } 
        setShow(true)
        info.funcSetor(info.select[0].setor)
        info.funcGrupo(info.select[0].grupo)
        info.funcNome(info.select[0].funcionaio)
        info.funcMatricula(info.select[0].matricula)
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        console.log(info.select)
    };


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {info.metodo}
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{info.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputTextDefault
                        info={{
                            id: info.idSetor,
                            placeholder: info.placeholderSetor,
                            func: info.funcSetor,
                            value: info.valueSetor
                        }}
                    />
                    <InputTextDefault
                        info={{
                            id: info.idGrupo,
                            placeholder: info.placeholderGrupo,
                            func: info.funcGrupo,
                            value: info.valueGrupo
                        }}
                    />
                    <InputTextDefault
                        info={{
                            id: info.idNome,
                            placeholder: info.placeholderNome,
                            func: info.funcNome,
                            value: info.valueNome
                        }}
                    />
                    <InputTextDefault
                        info={{
                            id: info.idMatricula,
                            placeholder: info.placeholderMatricula,
                            func: info.funcMatricula,
                            value: info.valueMatricula
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={info.editar}>Editar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditarFuncionario;