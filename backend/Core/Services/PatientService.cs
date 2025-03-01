using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using Core.Models;

namespace Core.Services
{
    public class PatientService : IPatientService
    {
        private readonly IPatientRepository _repository;

        public PatientService(IPatientRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Patient>> GetPatientsAsync()
        {
            return await _repository.ListAsync();
        }

        public async Task CreatePatientAsync(Patient patient)
        {
            await _repository.CreateAsync(patient);
        }

        public async Task<Patient?> GetPatientByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }
    }
}
