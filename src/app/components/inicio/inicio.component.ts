import { Component } from '@angular/core';
import { config } from '../../models/Configuracion';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  config = config;

  jugador: string = '';
  apellido: string = '';
  maxRango: number = 0;
  maxIntentos: number = 0;

  esconderParametros: boolean = false;
  terminado: boolean = false;
  numeroIntroducido: number = 0;

  comprobacionJugador(tipo: string): boolean {
    if (tipo == 'nombre') {
      this.config.mostrarErrorJugador = true;
      if (this.jugador.trim().length == 0) {
        this.config.jugadorValido = false;
        return false;
      } else {
        this.config.jugadorValido = true;
        return true;
      }
    } else if (tipo == 'apellido') {
      this.config.mostrarErrorApellido = true;
      if (this.apellido.trim().length == 0) {
        this.config.apellidoValido = false;
        return false;
      } else {
        this.config.apellidoValido = true;
        return true;
      }
    }
    return false;
  }

  comprobarParametro(max: number, name: string): boolean {
    if (name == 'rango') {
      this.config.mostrarErrorRango = true;
      if (this.maxRango < max) {
        this.config.rangoValido = false;
        return false;
      } else {
        this.config.rangoValido = true;
        return true;
      }
    } else if (name == 'intentos') {
      this.config.mostrarErrorIntentos = true;
      if (this.maxIntentos < max) {
        this.config.intentosValido = false;
        return false;
      } else {
        this.config.intentosValido = true;
        return true;
      }
    }
    return false;
  }

  comprobarBoton(): boolean {
    return (
      this.config.jugadorValido &&
      this.config.rangoValido &&
      this.config.intentosValido
    );
  }

  recogerDatos(): void {
    this.config.jugador = this.jugador;
    this.config.apellido = this.apellido;
    this.config.rangoMax = this.maxRango;
    this.config.intentosMax = this.maxIntentos;

    this.config.numeroRandom =
      Math.floor(Math.random() * this.config.rangoMax) + 1;

    this.esconderParametros = true;
  }

  restarIntentos(): void {
    if (this.config.intentosMax > 0) {
      this.config.intentosMax -= 1;
    }
  }

  comprobarNumero(): void {
    this.restarIntentos();
    if (this.numeroIntroducido == this.config.numeroRandom) {
      this.config.mensaje = '¡Has acertado!';
      this.terminado = true;
    } else if (this.config.intentosMax == 0) {
      this.config.mensaje =
        'Lo siento ' +
        this.config.jugador +
        ', has perdido. El número era ' +
        this.config.numeroRandom +
        '.';
      this.terminado = true;
    } else {
      const diferencia = Math.abs(
        this.numeroIntroducido - this.config.numeroRandom
      );
      if (diferencia >= 3) {
        this.config.mensaje = '¡Te pasaste!';
      } else if (diferencia == 1) {
        this.config.mensaje = '¡Caliente!';
      } else if (diferencia == 2) {
        this.config.mensaje = '¡Templado!';
      } else {
        this.config.mensaje = '¡Frío!';
      }
    }
  }
}
