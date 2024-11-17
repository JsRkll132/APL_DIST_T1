import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventHandlerPayload } from '@livechat/widget-angular'
import { LiveChatWidgetComponent } from '@livechat/widget-angular';
import { NgModel } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//import { LivechatComponentComponent } from "../livechat-component/livechat-component.component";
//import { OnInit } from '@angular/core';
//declare const initChatWidget : any
@Component({
  selector: 'app-livechatwidget-component',
  standalone: true,
  imports: [FormsModule,RouterOutlet, CommonModule, RouterModule, ],
  templateUrl: './livechatwidget-component.component.html',
  styleUrl: './livechatwidget-component.component.css'
})
export class LivechatwidgetComponentComponent {
  isOpen = false;
  userMessage = '';
  messages: { sender: string, text: string }[] = [
    { sender: 'bot', text: '¡Hola! ¿En qué puedo ayudarte?' },
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    // Verificar si el mensaje está vacío
    if (this.userMessage.trim() === '') {
      return;
    }

    // Agregar el mensaje del usuario a la lista de mensajes
    this.messages.push({ sender: 'user', text: this.userMessage });

    // Limpiar el campo de entrada
    this.userMessage = '';

    // Llamar a la función para procesar la respuesta automática del bot
    this.autoReply();
  }

  autoReply() {
    // Respuesta automática después de 1 segundo
    setTimeout(() => {
      const botReply = 'Esta es una respuesta automática. Gracias por tu mensaje.sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss';
      this.messages.push({ sender: 'bot', text: botReply });
    }, 1000);
  }
}
