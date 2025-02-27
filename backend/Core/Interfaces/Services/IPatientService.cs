using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IPatientService
    {
        public Task<IEnumerable<Patient>> GetPatients();
        public Task<Patient> GetPatientById(int id);
        public Task CreatePatient(Patient patient);

    }
}
