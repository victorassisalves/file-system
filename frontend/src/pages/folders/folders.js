import React, { Component } from 'react';
import "./folders.css";
import LogoOn from "../../assets/logo_onsurance.png";
import {MdInsertDriveFile, MdFolderOpen} from "react-icons/md";
import api from "../../services/api";
import { distanceInWords } from "date-fns";
import pt from "date-fns/locale/pt";
import Dropzone from "react-dropzone";
import socket from "socket.io-client"; 


class folders extends Component {
    
    state = {
        folder: {}
    }
    async componentDidMount(){
        this.refreshInUpdate();
        const folderId = this.props.match.params.id;
        const response = await api.get(`/folders/${folderId}`)
        this.setState({
            folder: response.data
        });

    }
    refreshInUpdate = () => {
        const io = socket("https://file-system-vic.herokuapp.com");
        const folderId = this.props.match.params.id;
        io.emit("connectRoom", folderId );
        io.on("file", async data => {
            await this.setState({
                folder: {...this.state.folder, files: [data,...this.state.folder.files]}
            })
        })
    }
    handleUpload = files => {
        files.forEach(file => {
            console.log(file);
            const fileUpload = new FormData()
            fileUpload.append('file', file);
            const folderId = this.props.match.params.id;
            api.post(`/folders/${folderId}/files`, fileUpload)
        });

    }
    render() {
        return (
            <div id="folder-container">
                <header>
                        <img src={LogoOn} alt=''/>                
                    <h1>
                        <MdFolderOpen size={40} color="#888"/>
                        {this.state.folder.title}
                    </h1>
                </header>

                <Dropzone onDropAccepted={this.handleUpload}>
                    {({getRootProps, getInputProps}) => (
                        <div className="upload" {...getRootProps()}>
                            <input {...getInputProps()}/>
                            <p>Arraste arquivos pra cá, ou clique aqui.</p>
                        </div>
                    )}
                </Dropzone>

                <ul>
                    {
                        this.state.folder.files && this.state.folder.files.map(file => (
                            <li key={file._id}>
                                <a href={file.url} className="file-info">
                                    <MdInsertDriveFile size={30} color="#00AAF1"/>
                                    <strong>{file.title}</strong>
                                </a>
                                {new Date(file.createdAt).getTime() <= new Date(file.updatedAt).getTime() ? (
                                    <span id="add-info">Criado há {distanceInWords(file.updatedAt, new Date(), {locale: pt})}... </span>
                                ) : (
                                    <span id="add-info">Atualizado há {distanceInWords(file.updatedAt, new Date(), {locale: pt})}... </span>
                                )

                                }
                            </li>
                        ))
                    }
                    
                </ul>
            </div>
        );
    }
}

export default folders;