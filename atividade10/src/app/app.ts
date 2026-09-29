import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskCardComponent } from './components/task-card/task-card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskCardComponent],
  templateUrl: './app.html'
})
export class App {
  novaTarefaTexto = '';
  
  tarefas = [
    { id: 1, titulo: 'Estudar Angular Components', concluida: true },
    { id: 2, titulo: 'Praticar @Input e @Output', concluida: false }
  ];

  adicionarTarefa() {
    if (this.novaTarefaTexto.trim() === '') return;
    this.tarefas.push({ id: Date.now(), titulo: this.novaTarefaTexto.trim(), concluida: false });
    this.novaTarefaTexto = '';
  }

  alternarStatus(id: number) {
    const tarefa = this.tarefas.find(t => t.id === id);
    if (tarefa) tarefa.concluida = !tarefa.concluida;
  }

  removerTarefa(id: number) {
    this.tarefas = this.tarefas.filter(t => t.id !== id);
  }
}