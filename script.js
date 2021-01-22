function max(val1, val2)
{
	return val1>val2?val1:val2;
}

function lShift(array, n)
{
	let l=array.length-1,j,i;
	for(i=n,j=0;i<=l;i++,j++)
	{
		array[j]=array[i];
	}
	for(j;j<=l;j++)
		array[j]=0;
}

function rShift(array, n)
{
	let l=array.length-1,j,i;
	for(i=l-n,j=l;i>=0;i--,j--)
	{
		array[j]=array[i];
	}
	for(j;j>=0;j--)
		array[j]=0;
}

function comp2(a)
{
	let i=a.length-1;
	while(a[i]!=1)
	{
		i--;
	}
	i--;
	for (i; i >= 0; i--) {
		a[i]=a[i]==1?0:1;
	}
	return a;
}

function createResult(SC,AC,Q,Qn,res,move){
	let moves=["A = A - M","A = A + M","Arithmetic Shift Right"],s="     ";
	let l="<p>SC: "+SC+s+"AC: "+AC.join(" ")+s+"Q: "+Q.join(" ")+s+"Qn+1: "+Qn+s+s+moves[move]+"</p>";
	res=res+'<div class="lines col-9">'+l+"</div><br/><br/>";
	if(move==2)
		res=res+'<div class="lines col-9 separator"></div><br/><br/>';
	return res;
}

function alignRight(array,alignedLength)
{
	let n=array.length-1;
	alignedLength--;
	let i=alignedLength-n-1;
	for(n;n>=0;n--)
	{
		array[alignedLength--]=array[n];
	}
	for(i;i>=0;i--)
	{
		array[i]=0;
	}
}

function carry(a,l)
{
	if(a[l]==2)
	{
		a[l]=0;
		a[l-1]+=1;
	}
	else if(a[l]==3)
	{
		a[l]=1;
		a[l-1]+=1;
	}
}

function addBinary(a,b)
{
	let l=(a.length>b.length)?a.length:b.length;
	let res=[];
	l--;
	for(let i=0;i<=l;i++)
		res[i]=0;

	while(l>=0)
	{
		res[l]+=a[l]+b[l];
		carry(res,l);
		l--;
	}
	return res;
}

function boothMultiplication(multiplier, multiplicand)
{
	let M=multiplicand,Q=multiplier,AC=[],Qn=0;
	let Mcomp=comp2(M.slice());
	let n=multiplier.length-1;
	let SC=n+1;
	for(let i=0;i<=n;i++)
		AC[i]=0;
	let res="";
	while(SC>0)
	{
		if((Q[n]==0 && Qn==0) || (Q[n]==1 && Qn==1))
		{
		}
		else if(Q[n]==0 && Qn==1)
		{
			AC=addBinary(AC,M);
			res=createResult(SC,AC,Q,Qn,res,1);
		}
		else if(Q[n]==1 && Qn==0)
		{
			AC=addBinary(AC,Mcomp);
			res=createResult(SC,AC,Q,Qn,res,0);
		}
		Qn=Q[n];
		rShift(Q,1);
		Q[0]=AC[n];
		rShift(AC,1);
		AC[0]=AC[1];
		SC--;
		res=createResult(SC,AC,Q,Qn,res,2);
	}
	ans=AC.join(" ")+" "+Q.join(" ");
	return res;
} 

function autoBooth(multiplicand,multiplier)
{
	if(multiplier.length>multiplicand.length)
		alignRight(multiplicand,multiplier.length);
	else
		alignRight(multiplier,multiplicand.length);
	return boothMultiplication(multiplier,multiplicand);
}

function decimal2Binary(number)
{
	let t=number,i=0,array=[];
	while(t>0)
	{
		array[i]=t%2;
		t=Math.floor(t/2);
		i++;
	}
	return array.reverse();
}

function calc() {
	let multiplicand=document.getElementById("multiplicand").value.split("").map(x=>+x);
	let multiplier=document.getElementById("multiplier").value.split("").map(x=>+x);
	let l=max(multiplicand.length,multiplier.length);
	alignRight(multiplier,l);
	alignRight(multiplicand,l);
	let m=multiplier.slice();
	let a='0',s="     ";
	let ini='<div class="lines col-9"><p>SC: 0'+s+'AC: '+a.repeat(l)+s+'Q: '+m.join(" ")+s+'Qn+1: 0'+s+s+'Initialization</p></div><br/><br/><div class="lines col-9 separator"></div><br/><br/>';
	let heading='<div class="lines col-9 resultHeading">Result :</div><br/><br/>';
	let res=heading+ini+autoBooth(multiplicand,multiplier);
	let p='<div class="lines col-9"><p>Answer : '+ans+'</p></div><br/><br/>';
	res=res+p;
	console.log("ans" + ans);
	console.log(res);
	document.getElementById("result").innerHTML=res;
}