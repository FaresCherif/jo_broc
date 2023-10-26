import React, { Component } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';
import './ContactForm.css';


class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: [],  // Un tableau pour stocker les fichiers sélectionnés
      imageLinks: [],     // Un tableau pour stocker les liens des images
      email: '',          // Champ d'e-mail
      message: '',        // Champ de message
      status : 0
    };
  }

  handleFileChange = (e) => {
    // Récupérez les fichiers sélectionnés
    const selectedFiles = Array.from(e.target.files);
    this.setState({ selectedFiles });
  };

  handleEmailChange = (e) => {
    // Mettez à jour le champ d'e-mail
    this.setState({ email: e.target.value });
  };

  handleMessageChange = (e) => {
    // Mettez à jour le champ de message
    this.setState({ message: e.target.value });
  };

  handleUpload = async () => {
    if (this.state.selectedFiles.length === 0) {
      alert('Veuillez sélectionner au moins un fichier.');
      return;
    }

    const uploadPromises = this.state.selectedFiles.map((file) => {
      const formData = new FormData();
      formData.append('image', file);

      // Remplacez 'YOUR_API_KEY' par votre clé API ImgBB.
      const apiKey = 'af634f91a5471f3913ca6401ee4ff635';

      this.setState({ status: 1 }); // Mettre à jour l'état
      return axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
    });

    try {
      const responses = await Promise.all(uploadPromises);
      const imageLinks = responses.map((response) => response.data.data.url);

      this.setState({ imageLinks });

    } catch (error) {
      console.error('Erreur lors du téléchargement des images :', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };




  sendMail(){
    const serviceID = 'service_nmv27y4';
    const templateID = 'template_pywqzik';
    const userID = '0hdT4jUNONzgPJeGW';
  
    const images = this.state.imageLinks.join('\n');
    
    emailjs.send(serviceID, templateID, {
      images: images,
      email : this.state.email,
      message : this.state.message
    },userID)
    .then((response) => {
      console.log('E-mail envoyé avec succès', response);
    })
    .catch((error) => {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    });
  }

  render() {
    if(this.state.imageLinks.length > 0 && this.state.status===1){
      this.sendMail();
//      this.setState({ status: 1 }); // Mettre à jour l'état
 this.setState({ status: 0 });
      //this.state.status=0;
    }

    return (
      <div className="contact-form">
        {this.state.imageLinks.length <= 0 && (

        <div>
          <h1>Télécharger jusqu'à 5 Images</h1>
            <input type="file" accept="image/*" multiple onChange={this.handleFileChange} />

            {/* Champ d'e-mail */}
            <input
              type="email"
              placeholder="E-mail"
              value={this.state.email}
              className = "email"
              id = "email"
              onChange={this.handleEmailChange}
            />

            {/* Champ de message */}
            <textarea
              placeholder="Message"
              value={this.state.message}
              className = "message"
              id = "message"
              onChange={this.handleMessageChange}
            />
          <button onClick={this.handleUpload}>Envoyer</button>
        </div>
        )}

        {this.state.imageLinks.length > 0 && (
          <div>
            <h2>Merci pour votre envoi</h2>
            <div>
              Votre message sera vu dans les plus bref délais et je reviendrai vers vous.  
            </div>
          </div>
          
        )}
      </div>
    );
  }
}

export default ContactForm;