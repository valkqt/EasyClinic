﻿using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces.Repositories
{
    public interface IPatientRepository
    {
        public Task<IEnumerable<Patient>> ListAsync();
        public Task<Patient?> GetById(int id);
        public Task AddAsync(Patient patient);
    }
}
