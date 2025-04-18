package main

import (
	"context"
	"time"

	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/host"
	"github.com/shirou/gopsutil/mem"
	"github.com/shirou/gopsutil/process"
)

type SystemStats struct {
	CPUUsagePercent float64 `json:"cpuUsagePercent"`
	RAMUsedMB       uint64  `json:"ramUsedMB"`
	RAMTotalMB      uint64  `json:"ramTotalMB"`
	RAMUsagePercent float64 `json:"ramUsagePercent"`
	Uptime          uint64  `json:"uptime"`
	DiskUsedGB      uint64  `json:"diskUsedGB"`
	DiskTotalGB     uint64  `json:"diskTotalGB"`
	NumProcesses    int     `json:"numProcesses"`
	Hostname        string  `json:"hostname"`
	Platform        string  `json:"platform"`
}

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetSystemStats() (*SystemStats, error) {
	percent, err := cpu.Percent(200*time.Millisecond, false)
	if err != nil {
		return nil, err
	}

	vmStat, err := mem.VirtualMemory()
	if err != nil {
		return nil, err
	}

	diskStat, err := disk.Usage("/")
	if err != nil {
		return nil, err
	}

	procs, err := process.Processes()
	if err != nil {
		return nil, err
	}

	hostStat, err := host.Info()
	if err != nil {
		return nil, err
	}

	return &SystemStats{
		CPUUsagePercent: percent[0],
		RAMUsedMB:       vmStat.Used / 1024 / 1024,
		RAMTotalMB:      vmStat.Total / 1024 / 1024,
		RAMUsagePercent: vmStat.UsedPercent,
		Uptime:          hostStat.Uptime,
		DiskUsedGB:      diskStat.Used / 1024 / 1024 / 1024,
		DiskTotalGB:     diskStat.Total / 1024 / 1024 / 1024,
		NumProcesses:    len(procs),
		Hostname:        hostStat.Hostname,
		Platform:        hostStat.Platform,
	}, nil
}
