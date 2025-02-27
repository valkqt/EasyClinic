using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public enum Motivation
    {
        FirstVisit,
        Checkup,
        Urgent
    }
    public enum Category
    {
        Home,
        Outpatient
    }
    public class Examination
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public string Anamnesis { get; set; }
        public Motivation Motivation { get; set; }
        public Category Category { get; set; }
        public int PatientId { get; set; }

        //public Examination(int id, DateTime dateTime, string anamnesis, Motivation motivation, Category category)
        //{
        //    Id = id;
        //    DateTime = dateTime;
        //    Anamnesis = anamnesis;
        //    Motivation = motivation;
        //    Category = category;
        //}

        public Examination(int id, DateTime dateTime,  string anamnesis, Motivation motivation, Category category, int patientId)
        {
            Id = id;
            DateTime = dateTime;
            Anamnesis = anamnesis;
            Motivation = motivation;
            Category = category;
            PatientId = patientId;
        }
    }
}
