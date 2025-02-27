using Core.Interfaces;
using Core.Interfaces.Services;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public class ExaminationService : IExaminationService
    {
        private readonly IExaminationRepository _repository;
        public ExaminationService(IExaminationRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Examination>> GetExaminations()
        {
            return await _repository.ListAsync();

        }

        public async Task CreateExamination(Examination exam)
        {
            await _repository.Create(exam);
        }

        public async Task UpdateExamination(Examination exam)
        {
            await _repository.Update(exam);
        }
    }
}
