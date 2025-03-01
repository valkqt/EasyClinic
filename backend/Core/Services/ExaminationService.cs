using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Interfaces.Services;
using Core.Models;

namespace Core.Services
{
    public class ExaminationService : IExaminationService
    {
        private readonly IExaminationRepository _repository;

        public ExaminationService(IExaminationRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Examination>> GetExaminationsAsync()
        {
            return await _repository.ListAsync();
        }

        public async Task<int> CreateExaminationAsync(Examination exam)
        {
            return await _repository.CreateAsync(exam);
        }

        public async Task UpdateExaminationAsync(Examination exam)
        {
            await _repository.UpdateAsync(exam);
        }
    }
}
