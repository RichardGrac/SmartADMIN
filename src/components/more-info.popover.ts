import {Component} from "@angular/core";

@Component({
  selector: 'info-popower',
  template: `
    <div margin padding class="popover-border">
      
      <h3 text-center>Ayuda</h3>
      <p text-justify	>
        <b>Encendido / Apagado de iluminación:</b>
        Toque sobre el ícono del <i>Foco</i> o sobre su nombre para accionarlo.
      </p>
      <p text-justify>
        <b>Configuración:</b>
        Toque el botón de <i>Opciones</i> para configurar la hora de encedido / apagado
        automático de sus unidades.
      </p>
      
    </div>    
  `
})

export class PopoverInfoComponent{

    constructor(){

    }
}
