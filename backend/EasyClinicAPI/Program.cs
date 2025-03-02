using Core.Interfaces;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using Core.Models;
using Core.Services;
using Core.Validators;
using DataAccess.Contexts;
using DataAccess.Extensions;
using DataAccess.Migrations;
using DataAccess.Repositories;
using FluentMigrator.Runner;
using FluentValidation;
using Microsoft.Extensions.Options;
using SharpGrip.FluentValidation.AutoValidation.Mvc.Extensions;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddScoped<IExaminationRepository, ExaminationRepository>();
builder.Services.AddScoped<IExaminationService, ExaminationService>();
builder.Services.AddScoped<IPatientRepository, PatientRepository>();
builder.Services.AddScoped<IPatientService, PatientService>();
builder.Services.AddScoped<IValidator<Patient>, PatientValidator>();
builder.Services.AddScoped<IValidator<Examination>, ExaminationValidator>();

builder.Services.AddFluentValidationAutoValidation();

builder.Services.AddSingleton<EasyClinicContext>();
builder
    .Services.AddLogging(c => c.AddFluentMigratorConsole())
    .AddFluentMigratorCore()
    .ConfigureRunner(c =>
        c.AddSqlServer2012()
            .WithGlobalConnectionString(builder.Configuration.GetConnectionString("EasyClinicConn"))
            .ScanIn(typeof(M0004_ChangePatientGender).Assembly)
            .For.Migrations()
    );



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
{
    builder.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MigrateDatabase();

app.Run();
