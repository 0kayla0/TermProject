import React,{Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

export default class RegisterReport extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal: false,

        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render(){

        let modal_title, modal_description;

        if(this.props.register_name !== null){
            modal_title = this.props.register_name + " Current Sales Report since the register was closed last";
            modal_description = "Lets get this bread"; //FIXME to be the report sent back from the register call
        }else{
            modal_title = "Please Select a Store you would like to view.";
            modal_description = "To select a store to opertate, click on the drop down list for the store to shop at";
        }

        return(
            <div>
                <Form inline onSubmit={(e) => e.preventDefault()}>
                    <Button onClick={this.toggle}>View the Sales Report of this Store</Button>
                </Form>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={"static"}>
                    <ModalHeader toggle={this.toggle}>{modal_title}</ModalHeader>
                    <ModalBody>
                        {modal_description}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}

