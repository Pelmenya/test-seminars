import { makeAutoObservable } from 'mobx';
import axios from 'axios';

interface Seminar {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
}

class SeminarStore {
  seminars: Seminar[] = [];
  loading = false;
  private host = 'http://localhost:3000/seminars/';
  
  constructor() {
    makeAutoObservable(this);
    
  }

  fetchSeminars = async () => {
    this.loading = true;
    try {
      const response = await axios.get<Seminar[]>(this.host);
      this.seminars = response.data;
      console.log("Fetched seminars:", this.seminars);
    } catch (error) {
      console.error("Error fetching seminars:", error);
    } finally {
      this.loading = false;
    }
  };

  deleteSeminar = async (id: number) => {
    console.log(`Attempting to delete seminar with id: ${id}`);
    try {
      await axios.delete(`${this.host}${id}`);
      this.seminars = this.seminars.filter(seminar => seminar.id !== id);
      console.log(`Deleted seminar with id: ${id}`);
    } catch (error) {
      console.error("Error deleting seminar:", error);
    }
  };

  editSeminar = async (updatedSeminar: Seminar) => {
    console.log("Attempting to edit seminar:", updatedSeminar);
    try {
      const response = await axios.put<Seminar>(`${this.host}${updatedSeminar.id}`, updatedSeminar);
      const index = this.seminars.findIndex(seminar => seminar.id === updatedSeminar.id);
      if (index >= 0) {
        this.seminars[index] = response.data;
        console.log("Updated seminar:", response.data);
      }
    } catch (error) {
      console.error("Error editing seminar:", error);
    }
  };
}

export const seminarStore = new SeminarStore();
