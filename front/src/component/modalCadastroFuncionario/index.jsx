import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../modalCadastroFuncionario/index.css'
import InputTextDefault from '../inputTextDefault';

function ModalCadastroFuncionario({ info }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {info.metodo}
            </Button>

            <Modal style={{background: 'black'}}

                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
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
                    <Button variant="primary" onClick={info.cadastrar}>Cadastrar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCadastroFuncionario;