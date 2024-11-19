import { Injectable } from '@angular/core';
import {  GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAICacheManager } from '@google/generative-ai/server';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
  
})

export class GenaiServiceService {

  // = new GoogleGenerativeAI(api_key).getGenerativeModel({model : 'gemini-1.5-flash'})
  private modeli : GoogleGenerativeAI;
  private api_key : String
  private modeluse: any
  private cacheManager : GoogleAICacheManager;
  private cache : any;
  private chat : any;
  constructor() { 
    this.api_key = environment.gemini_api;
    this.modeli = new GoogleGenerativeAI( this.api_key.toString() )
    this.cacheManager = new GoogleAICacheManager(this.api_key.toString());
    const systemInstruction =
    'Seras un guia de un sistema de comedor' +
    "Estaras para responder cualquier pregunta hecha por el usuario...";
    this.modeluse = this.modeli.getGenerativeModel({ model: "gemini-1.5-flash" ,systemInstruction});
    this.chat = this.modeluse.startChat();
    ///this.createCacheManager();
  }

   /*
  private async createCacheManager(){
// Create a cache with a 5 minute TTL.
    const displayName = 'sherlock jr movie';
    const model = 'models/gemini-1.5-flash-001';
    const systemInstruction =
      'Seras un guia de un sistema de comedor' +
      "Estaras para responder cualquier pregunta hecha por el usuario...";
    let ttlSeconds = 300;
    this.cache = await this.cacheManager.create({
      model,
      displayName,
      systemInstruction,
      contents: [
        {
          role: 'user',
          parts : [
            {
              text: "Hola a continuacion ofreceras una guia de usuario con la cual ayudaras a interactuar al con el sistema"+
              " y responder todas sus preguntas",
              
             
            }
          ]
        },
      ],
      ttlSeconds,
    });
  }

  
  public async MakePromptInTextWithCache(prompt:string){
    //const result = await this.modeluse.generateContent(prompt.toString());
    //return result.response.text();


    const genModel = this.modeli.getGenerativeModelFromCachedContent(this.cache);
  
    // Query the model.
    const result = await genModel.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text:
                prompt
            },
          ],
        },
      ],
    });
    this.cacheManager.update
    console.log(result.response.usageMetadata);
    //console.log(result.response.text);
    const text_rsp = result.response.text;
    console.log(text_rsp)
    return text_rsp.toString()
  }
  // Create a cache with a 5 minute TTL.

  
  // Get your API key from https://aistudio.google.com/app/apikey

  
  // Construct a `GenerativeModel` which uses the cache object.



  


*/













  public async MakePromptInText(prompt:string){

    const result = await this.chat.sendMessage(prompt.toString());// this.modeluse.generateContent(prompt.toString());
    console.log(this.chat.getHistory())
    return result.response.text();
  }




}
