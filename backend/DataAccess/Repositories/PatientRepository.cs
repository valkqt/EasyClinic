using Core.Interfaces.Repositories;
using Core.Models;
using Dapper;
using DataAccess.Contexts;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class PatientRepository : IPatientRepository
    {
        private readonly IConfiguration _configuration;
        private readonly EasyClinicContext _context;

        public PatientRepository(IConfiguration configuration, EasyClinicContext context)
        {
            _configuration = configuration;
            _context = context;
        }
        public async Task<IEnumerable<Patient>> ListAsync()
        {
            using (var connection = _context.Connect())
            {
                string sql = "SELECT * FROM Patients";
                IEnumerable<Patient> patients = await connection.QueryAsync<Patient>(sql);

                return patients;

            }
        }

        public async Task<Patient?> GetById(int id)
        {
            using (var connection = _context.Connect())
            {
                object parameters = new
                {
                    @ID = id
                };

                Patient? result = null;

                string sql = "SELECT p.*, e.Id, e.DateTime, e.Anamnesis, e.Motivation, e.Category, e.patientId FROM Patients p " +
                    "INNER JOIN Examinations e ON p.Id = e.PatientId " +
                    "WHERE PatientId = @ID";

                await connection.QueryAsync<Patient, Examination, Patient>(sql, 
                    (patient, examination) => {
                        if (result == null)
                        {
                            result = patient;
                        } 
                        result.Examinations.Add(examination); 
                        return patient; 
                    }, parameters, splitOn: "Id"    
                    );

                if (result == null)
                {
                    string sql2 = "SELECT * FROM Patients WHERE Id = @ID";

                    result = await connection.QuerySingleAsync<Patient>(sql2, parameters);

                }

                return result;
            }

        }

        public async Task AddAsync(Patient patient)
        {

            using (var connection = _context.Connect())
            {

                object parameters = new
                {
                    @FIRSTNAME = patient.FirstName,
                    @LASTNAME = patient.LastName,
                    @GENDER = patient.Gender,
                    @FISCALCODE = patient.FiscalCode,
                    @PHOTO = patient.Photo,
                    @DATEOFBIRTH = patient.DateOfBirth,
                };

                string sql = "INSERT INTO Patients (FirstName, LastName, Gender, FiscalCode, Photo, DateOfBirth, CreatedAt) " +
                    "VALUES (@FIRSTNAME, @LASTNAME, @GENDER, @FISCALCODE, @PHOTO, @DATEOFBIRTH, SYSDATETIME())";

                await connection.ExecuteAsync(sql, parameters);
            }


        }
    }
}
