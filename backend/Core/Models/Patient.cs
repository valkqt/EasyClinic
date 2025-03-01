using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public enum Gender
    {
        Male,
        Female,
        Other,
    }

    public class Patient
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Gender Gender { get; set; }
        public string FiscalCode { get; set; }
        public string Photo { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<Examination> Examinations { get; set; } = new List<Examination>();

        public Patient(
            int id,
            string firstName,
            string fiscalCode,
            DateTime dateOfBirth,
            DateTime createdAt,
            string photo,
            Gender gender,
            string lastName
        )
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Gender = gender;
            FiscalCode = fiscalCode;
            Photo = photo;
            DateOfBirth = dateOfBirth;
            CreatedAt = createdAt;
        }
    }
}
