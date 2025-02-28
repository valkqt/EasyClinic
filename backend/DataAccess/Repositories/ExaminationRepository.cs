using DataAccess.Contexts;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;
using Dapper;
using Core.Interfaces;


namespace DataAccess.Repositories
{
    public class ExaminationRepository : IExaminationRepository
    {
        private readonly IConfiguration _configuration;
        private readonly EasyClinicContext _context;

        public ExaminationRepository(IConfiguration configuration, EasyClinicContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        public async Task<IEnumerable<Examination>> ListAsync()
        {
            using (var connection = _context.Connect())
            {

                string sql = "SELECT * FROM Examinations";
                IEnumerable<Examination> examinations = await connection.QueryAsync<Examination>(sql);

                return examinations;
            }
        }

        public async Task Create(Examination exam)
        {
            using (var connection = _context.Connect())
            {
                object parameters = new { 
                    @MOTIVATION = exam.Motivation, 
                    @CATEGORY = exam.Category,
                    @ANAMNESIS = exam.Anamnesis,
                    @DATETIME = exam.DateTime,
                    @PATIENTID = exam.PatientId,
                };
                string sql = "INSERT INTO Examinations (DateTime, Anamnesis, Motivation, Category, PatientId) VALUES (@DATETIME, @ANAMNESIS, @MOTIVATION, @CATEGORY, @PATIENTID) SELECT SCOPE_IDENTITY()";
                await connection.ExecuteAsync(sql, parameters);

                
            }
        }

        public async Task Update(Examination exam)
        {
            using (var connection = _context.Connect())
            {
                object parameters = new
                {
                    @ID = exam.Id,
                    @MOTIVATION = exam.Motivation,
                    @CATEGORY = exam.Category,
                    @ANAMNESIS = exam.Anamnesis,
                    @DATETIME = exam.DateTime,
                    @PATIENTID = exam.PatientId,

                };
                string sql = "UPDATE Examinations SET Motivation = @MOTIVATION, Category = @CATEGORY, Anamnesis = @ANAMNESIS, DateTime = @DATETIME WHERE PatientId = @PATIENTID AND ID = @ID";

                await connection.ExecuteAsync(sql, parameters);

            }

        }
    }
}
