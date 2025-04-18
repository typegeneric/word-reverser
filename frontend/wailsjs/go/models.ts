export namespace main {
	
	export class SystemStats {
	    cpuUsagePercent: number;
	    ramUsedMB: number;
	    ramTotalMB: number;
	    ramUsagePercent: number;
	    uptime: number;
	    diskUsedGB: number;
	    diskTotalGB: number;
	    numProcesses: number;
	    hostname: string;
	    platform: string;
	
	    static createFrom(source: any = {}) {
	        return new SystemStats(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.cpuUsagePercent = source["cpuUsagePercent"];
	        this.ramUsedMB = source["ramUsedMB"];
	        this.ramTotalMB = source["ramTotalMB"];
	        this.ramUsagePercent = source["ramUsagePercent"];
	        this.uptime = source["uptime"];
	        this.diskUsedGB = source["diskUsedGB"];
	        this.diskTotalGB = source["diskTotalGB"];
	        this.numProcesses = source["numProcesses"];
	        this.hostname = source["hostname"];
	        this.platform = source["platform"];
	    }
	}

}

