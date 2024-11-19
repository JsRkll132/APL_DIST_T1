import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GenaiServiceService } from '../../../services/GenAi/genai-service.service';
//import { LivechatComponentComponent } from "../livechat-component/livechat-component.component";
//import { OnInit } from '@angular/core';
//declare const initChatWidget : any
@Component({
  selector: 'app-livechatwidget-component',
  standalone: true,
  imports: [FormsModule,RouterOutlet, CommonModule, RouterModule,],
  providers : [GenaiServiceService],
  templateUrl: './livechatwidget-component.component.html',
  styleUrl: './livechatwidget-component.component.css'
})
export class LivechatwidgetComponentComponent {
  

  constructor(private genaiServiceService : GenaiServiceService) {
    //this.genaiServiceService = Inject(GenaiServiceService)
  }
  ngOnInit() : void{
    this.genaiServiceService = new GenaiServiceService()
  }
  isOpen = false;
  userMessage = '';
  messages: { sender: string, text: string }[] = [
    { sender: 'bot', text: '¡Hola! ¿En qué puedo ayudarte?' },
  ];

  async toggleChat() {
    this.isOpen = !this.isOpen;
  }

  async sendMessage()  {
    // Verificar si el mensaje está vacío
    if (this.userMessage.trim() === '') {
      return;
    }

    // Agregar el mensaje del usuario a la lista de mensajes
    this.messages.push({ sender: 'user', text: this.userMessage });

    // Limpiar el campo de entrada
    this.userMessage = '';

    // Llamar a la función para procesar la respuesta automática del bot
    await this.autoReply();
  }

  async autoReply(): Promise<void> {
    // Respuesta automática después de 1 segundo
    setTimeout(async () => {
      console.log(this.messages[this.messages.length-1].text)
      const botReply = await this.genaiServiceService.MakePromptInText(this.messages[this.messages.length-1].text.toString());
      this.messages.push({ sender: 'bot', text: botReply });
    }, 1000);
  }
}
