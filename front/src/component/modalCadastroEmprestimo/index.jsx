import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from '../dropdown';
import InputTextDefault from '../inputTextDefault';

function ModalCadastro({ info }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                <Modal.Header >
                    <Modal.Title>{info.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Dropdown
                        placeholder={"EPI"}
                        selectedOption={info.epiSelect}
                        setSelectOption={info.setEpiSelect}
                        options={info.epi}
                    />
                    <Dropdown
                        placeholder={"Nome do funcionário"}
                        selectedOption={info.nomeSelect}
                        setSelectOption={info.setNomeSelect}
                        options={info.nome}
                    />
                    <Dropdown
                        placeholder={"Matricula"}
                        selectedOption={info.matriculaSelect}
                        setSelectOption={info.setMatriculaSelect}
                        options={info.matricula}
                    />
                    <InputTextDefault
                        info={{
                            id: info.idDatar,
                            placeholder: info.placeholderDatar,
                            func: info.funcDatar,
                            value: info.valueDatar
                        }}
                    />
                    <InputTextDefault
                        info={{
                            id: info.idDatad,
                            placeholder: info.placeholderDatad,
                            func: info.funcDatad,
                            value: info.valueDatad
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

export default ModalCadastro;