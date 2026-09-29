import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.html'
})
export class TaskCardComponent {
  @Input() tarefa: any;
  @Output() aoAlterar = new EventEmitter<number>();
  @Output() aoRemover = new EventEmitter<number>();

  alterar() {
    this.aoAlterar.emit(this.tarefa.id);
  }

  remover() {
    this.aoRemover.emit(this.tarefa.id);
  }
}